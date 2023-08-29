import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog";

test('Blog component renders title by default', async () => {

    const user = {
        username : "IronMan",
        name : "Tony Stark",
        password : "ironman"
    }

    const blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'https://example.com',
        likes: 10,
        id: 'test-id',
        user: {
          name: 'Test User',
          username: 'testuser',
        },
    }

    render(<Blog blog={blog} userSession={{ username: 'testUser' }} />)

    screen.debug()
    const titleElement = screen.getByText(blog.title);
    const authorElement = screen.getByText(`Author: ${blog.author}`);
    const urlElement = screen.queryByText(blog.url); // Using queryByText for elements that should not be present
    const likesElement = screen.queryByText(`likes: ${blog.likes}`);
    
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(urlElement).not.toBeInTheDocument(); // URL should not be present
    expect(likesElement).not.toBeInTheDocument();

      // Now let's test the visibility toggle
    const viewMoreButton = screen.getByText('view more');
    fireEvent.click(viewMoreButton);

    const urlElementVisible = screen.getByText(blog.url);
    const likesElementVisible = screen.getByText(`likes: ${blog.likes}`);
    
    expect(urlElementVisible).toBeInTheDocument();
    expect(likesElementVisible).toBeInTheDocument();

})