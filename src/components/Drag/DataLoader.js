import React from "react";
import { FixedSizeList, VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {Container} from "./Container";
import {useRef} from 'react';


export default function ({
                                           // Are there more items to load?
                                           // (This information comes from the most recent API request.)
                                           hasNextPage,

                                           // Are we currently loading a page of items?
                                           // (This may be an in-flight flag in your Redux store for example.)
                                           isNextPageLoading,

                                           // Array of items loaded so far.
                                           items,

                                           // Callback function responsible for loading the next page of items.
                                           loadNextPage,

                                            // refresh task list
                                            setShouldRefreshTaskList
                                       }) {
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = hasNextPage ? items.length + 1 : items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = index => !hasNextPage || index < items.length;

    // Render an item or a loading indicator.

    //items[index].title;

    const Item = ({ index, style }) => {
        let content;
        if (!isItemLoaded(index)) {
            content = "Loading...";
        } else {
            content = <Container setShouldRefreshTaskList={setShouldRefreshTaskList} items={items[index].tasks} />;
        }

        return <div style={style}>{content}</div>;
    };

    const getItemSize = (index) => {
        const size = items[index].tasks.length * 45;

         return size;
    }

    const listRef = useRef();

    const scrollToRow300Center = () => {
        listRef.current.scrollToItem(49000, "center");
    };

    return (
        <>
            <button onClick={scrollToRow300Center}>Move to 300</button>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
            >
                {({ onItemsRendered, ref }) => (
                    <VariableSizeList
                        height={1200}
                        width={1300}
                        itemCount={items.length}
                        itemSize={getItemSize}
                        ref={listRef}
                    >
                        {Item}
                    </VariableSizeList>
                )}
            </InfiniteLoader>
        </>
    );
}

/*
                <FixedSizeList
                    className="List"
                    height={800}
                    itemCount={itemCount}
                    itemSize={200}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={800}
                >
                    {Item}
                </FixedSizeList>
*/

/*
<List
    height={height}
    rowCount={list.length}
    rowHeight={20}
    rowRenderer={rowRenderer}
    width={width}
/>*/