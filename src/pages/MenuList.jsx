import  { useState, useEffect } from 'react';
import { Container, ListGroup, Image } from 'react-bootstrap';
import axios from 'axios'; // 메뉴 데이터를 불러오기 위해 axios 사용

function MenuList({ cafeId }) {
    const [menus, setMenus] = useState([]);

    // API로부터 메뉴 데이터를 가져오는 함수
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
    }, [cafeId]); // cafeId가 변경될 때마다 메뉴 데이터 재요청

    return (
        <Container>
            <ListGroup>
                {menus.map((menu, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                        <Image src={menu.image} rounded style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                        <div>
                            <strong>{menu.name}</strong>  {/* 메뉴 이름 표시 */}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default MenuList;
