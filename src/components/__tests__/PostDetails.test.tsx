import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import axios from 'axios';
import PostDetails from '../PostDetails';
import { Link } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostDetails Component', () => {
  const mockRouterProps = {
    params: { id: '1' },
    navigate: jest.fn(),
    location: {},
  };

  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test Content',
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockPost });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    const wrapper = shallow(<PostDetails router={mockRouterProps} />);
    expect(wrapper.text()).toContain('Loading...');
  });

  it('should fetch and render post details', async () => {
    const wrapper = shallow<React.Component<{}, {}>>(
      <PostDetails router={mockRouterProps} />
    );

    // @ts-ignore
    const instance = wrapper.instance() as PostDetails;

    if (instance && instance.componentDidMount) {
      await instance.componentDidMount();
      wrapper.update();
    }

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/posts/1');
    expect(wrapper.state('post')).toEqual(mockPost);
    expect(wrapper.find('h1').text()).toBe('Test Post');
  });
});
