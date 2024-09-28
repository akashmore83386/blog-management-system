import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import PostForm from '../PostForm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostForm Component', () => {
  const mockRouterProps = {
    params: {},
    navigate: jest.fn(),
    location: {},
  };

  const mockPost = {
    id: 1,
    title: 'Existing Post',
    content: 'Existing Content',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<PostForm router={mockRouterProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should update state on input change', () => {
    const wrapper = shallow(<PostForm router={mockRouterProps} />);
    const event = { target: { name: 'title', value: 'New Title' } };
    wrapper.find('input[name="title"]').simulate('change', event);
    expect(wrapper.state('title')).toBe('New Title');
  });

  it('should handle form submission for creating a new post', async () => {
    mockedAxios.post.mockResolvedValue({ data: { id: 2 } });
    const wrapper = shallow(<PostForm router={mockRouterProps} />);
    wrapper.setState({ title: 'New Post', content: 'New Content' });

    await wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3001/posts', {
      title: 'New Post',
      content: 'New Content',
    });
    expect(mockRouterProps.navigate).toHaveBeenCalledWith('/');
  });

  it('should fetch existing post when editing', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPost });
    const editRouterProps = {
      ...mockRouterProps,
      params: { id: '1' },
    };
    const wrapper = shallow<React.Component<{}, {}>>(
      <PostForm router={editRouterProps} />
    );

    // @ts-ignore
    const instance = wrapper.instance() as PostForm;

    if (instance && instance.componentDidMount) {
      await instance.componentDidMount();
      wrapper.update();
    }

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/posts/1');
    expect(wrapper.state('title')).toBe('Existing Post');
    expect(wrapper.state('content')).toBe('Existing Content');
  });

  it('should handle form submission for updating a post', async () => {
    mockedAxios.put.mockResolvedValue({});
    const editRouterProps = {
      ...mockRouterProps,
      params: { id: '1' },
    };
    const wrapper = shallow<React.Component<{}, {}>>(
      <PostForm router={editRouterProps} />
    );
    wrapper.setState({ title: 'Updated Title', content: 'Updated Content' });

    await wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:3001/posts/1', {
      title: 'Updated Title',
      content: 'Updated Content',
    });
    expect(mockRouterProps.navigate).toHaveBeenCalledWith('/');
  });
});
