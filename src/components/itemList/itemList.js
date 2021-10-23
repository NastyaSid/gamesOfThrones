import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import PropTypes from 'prop-types';

const List = styled.ul`
        cursor: pointer;
`;

const ListItem = styled.li`
        position: relative;
        display: block;
        padding: 0.75rem 1.25rem;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125); 
`;

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then( (data) => {
                    updateList(data)
            })
    }, []);

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;

            const label = renderItem(item);

            return (
                <ListItem 
                    key={id}
                    onClick={ () => onItemSelected(id)}>
                    {label}
                </ListItem>
            )
        })
    }


    if (!itemList) {
        return (
        <div className="random-block rounded">
            <Spinner/>
        </div>
        )
    }

    const items = renderItems(itemList);

    return (
        <List>
            {items}
        </List>
    );
}
export default ItemList;

ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

