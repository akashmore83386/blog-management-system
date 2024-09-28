import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import axios from 'axios';
import BlogList from '../BlogList';
import { Link } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BlogList Component', () => {
  const mockPosts = [
    { id: 1, title: 'First Post', content: 'Content 1' },
    { id: 2, title: 'Second Post', content: 'Content 2' },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockPosts });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', async () => {
    const wrapper = shallow<BlogList>(<BlogList />);

    const instance = wrapper.instance() as BlogList;

    if (instance && instance.componentDidMount) {
      await instance.componentDidMount();
      wrapper.update();
    }

    expect(wrapper.exists()).toBe(true);
  });

  it('should fetch and render posts', async () => {
    const wrapper = shallow<BlogList>(<BlogList />);

    const instance = wrapper.instance() as BlogList;

    if (instance && instance.componentDidMount) {
      await instance.componentDidMount();
      wrapper.update();
    }

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/posts');
    expect(wrapper.state('posts')).toEqual(mockPosts);
    expect(wrapper.find('.blogCard')).toHaveLength(2);
  });
});
