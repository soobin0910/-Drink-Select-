import { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/MenuList.css';
import axios from 'axios';

function MenuList() {
    const location = useLocation();
    const navigate = useNavigate();
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
            <ListGroup className="list mb-4">
                {menus.map((menu, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                          <img 
                            src={`http://localhost:5000/${menu['이미지 경로']}`} 
                            alt={`${menu.음료명} 이미지`} 
                            className="menu-logo" 
                            style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '50px' }} // 스타일 조정
                        />
                        <div>
                            <h5><strong>{menu.카페명}</strong></h5>
                            <h5><strong>{menu.음료명}</strong></h5>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <Button className="my-3" style={{ backgroundColor: '#FFEE56', borderColor: '#FFEE56', color: '#000' }}
            onClick={() => navigate('/')}>
              <h4 className="mb-0 p-1"><strong>메인 페이지로</strong></h4>
            </Button>

        </Container>
    );
}

export default MenuList;
