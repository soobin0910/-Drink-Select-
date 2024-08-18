import { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/MenuList.css';
import axios from 'axios';

function MenuList() {
    const location = useLocation();
    const { cafeName } = location.state || {};  // CafeSelect에서 전달된 카페 이름
    const [menus, setMenus] = useState([]);

    // API로부터 메뉴 데이터를 가져오는 함수
    useEffect(() => {
        async function fetchMenus() {
            try {
                const response = await axios.get(`http://localhost:5000/api/menus/${cafeName}`);
                console.log('API Response:', response.data);  // 데이터 확인
                setMenus(response.data); // 메뉴 데이터 상태 업데이트
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
                            <h5><strong>{menu.카페명}</strong></h5>  {/* 카페 이름 표시 */}
                            <h5><strong>{menu.음료명}</strong></h5>  {/* 메뉴 이름 표시 */}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

// PropTypes에서 cafeName을 필수로 설정
MenuList.propTypes = {
    cafeName: PropTypes.string.isRequired
};

export default MenuList;
