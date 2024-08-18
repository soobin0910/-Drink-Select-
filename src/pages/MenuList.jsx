import { useState, useEffect } from 'react';
import { Container, ListGroup, Image } from 'react-bootstrap';
import '../css/MenuList.css';
import axios from 'axios';

function MenuList({ cafeId }) {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        async function fetchMenus() {
            try {
                const response = await axios.get(`/api/menus/${cafeId}`);
                setMenus(response.data); // 메뉴 데이터 상태 업데이트
            } catch (error) {
                console.error('Failed to fetch menus:', error);
            }
        }

        fetchMenus();
    }, [cafeId]);

    return (
        <Container>
            <ListGroup>
                {menus.map((menu, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                        <Image src={menu.image} rounded style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                        <div>
                            <strong>{menu.name}</strong>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default MenuList;
