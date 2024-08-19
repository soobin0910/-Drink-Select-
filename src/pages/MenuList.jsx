import { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../css/MenuList.css';
import axios from 'axios';

function MenuList() {
    const location = useLocation();
    const { cafeName = 'Default Cafe Name' } = location.state || {};  // 기본값 설정
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        async function fetchMenus() {
            try {
                const response = await axios.get(`http://localhost:5000/api/menus/${cafeName}`);
                console.log('API Response:', response.data);
                setMenus(response.data);
            } catch (error) {
                console.error('Failed to fetch menus:', error);
            }
        }

        fetchMenus();
    }, [cafeName]);

    return (
        <Container className="body-control">
            <h1 className="title mb-5"><strong>{cafeName}</strong></h1>
            <ListGroup className="list mb-5">
                {menus.map((menu, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                        <div>
                            <h5><strong>{menu.카페명}</strong></h5>
                            <h5><strong>{menu.음료명}</strong></h5>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default MenuList;
