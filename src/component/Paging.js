import React, { useState, useEffect } from "react";

const Paging = ({ posts, loading }) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <ul className="list">
            {posts.map((post) => (
                <li key={post.id} className="list_item">
                    {post.title}
                </li>
            ))}
        </ul>
    );
};

export default Paging;
