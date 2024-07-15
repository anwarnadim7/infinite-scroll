import React, { useCallback, useState, useEffect } from 'react';
import '../App.css'; // Make sure to update the path if your CSS file is located elsewhere

function InfiniteScroll() {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos?page=${page}&client_id=cpUb90xLth9NRkoeqFRyOUfpauDK03RRl73RD4nzt04`);
            const data = await response.json();
            setItems(prevItems => [...prevItems, ...data]);
            if (data.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, [page]);

    

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        
        <div className="container">
            {items.map((item, index) => (
                <figure key={index}>
                 <img src={item.urls.small} alt={item.alt_description} className="image card" />
              </figure>
            ))}
            {hasMore && <p className="loading">Loading more items...</p>}
        </div>
    );
}

export default InfiniteScroll;
