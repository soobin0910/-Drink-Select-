import { useEffect, useState } from 'react';
import '../css/result2.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

const Result2 = () => {
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 데이터를 가져오기
        const selectedCafes = JSON.parse(localStorage.getItem('selectedCafes')) || [];
        const calories = parseInt(localStorage.getItem('calorieValue'), 10);
        const sugar = parseInt(localStorage.getItem('sugarValue'), 10);
        const caffeine = JSON.parse(localStorage.getItem('caffeine'));
        const excludeCoffee = JSON.parse(localStorage.getItem('excludeCoffee'));

        // 추천 결과를 백엔드에서 가져오기 (6~10위)
        fetch('http://localhost:5000/api/recommend/more', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cafes: selectedCafes,
                calories: calories,
                sugar: sugar,
                caffeine: caffeine,
                coffee: excludeCoffee
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('More Recommendations:', data); // 데이터 확인용 콘솔 로그
            setRecommendations(data);
        })
        .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div>
            <header className="header">
                <h1>추가 추천결과</h1>
            </header>
            <Stack gap={5}>
                <ListGroup as="ol" numbered>
                    {recommendations.map((item, index) => (
                        <ListGroup.Item as="li" key={index}>
                            {item.카페명}
                            <div>{item.음료명}</div>
                            {<img src={`http://localhost:5000/${item['이미지 경로']}`} alt={item.음료명} className="drink-image"/>
                        }
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>칼로리</th>
                                            <th>당류</th>
                                            <th>포화지방</th>
                                            <th>카페인</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.칼로리}</td>
                                            <td>{item.당류}</td>
                                            <td>{item.포화지방}</td>
                                            <td>{item.카페인}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Stack>
            <div className="button-container">
                <Button variant="warning" onClick={() => navigate('/result1')}>다시 확인하기</Button>{' '}
                <Button variant="warning" onClick={() => navigate('/')}>결과 확인완료</Button>{' '}
            </div>
        </div>
    );
}

export default Result2;
