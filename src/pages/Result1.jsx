import { useEffect, useState } from 'react';
import '../css/result1.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

const Result1 = () => {
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 데이터를 가져오기
        const selectedCafes = JSON.parse(localStorage.getItem('selectedCafes')) || [];
        const calories = parseInt(localStorage.getItem('calorieValue'), 10);
        const sugar = parseInt(localStorage.getItem('sugarValue'), 10);
        const caffeine = JSON.parse(localStorage.getItem('caffeine'));
        const excludeCoffee = JSON.parse(localStorage.getItem('excludeCoffee'));

        // 추천 결과를 백엔드에서 가져오기
        fetch('http://localhost:5000/api/recommend', {
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
            console.log('Recommendations:', data); // 데이터 확인용 콘솔 로그
            setRecommendations(data);
        })
        .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="body-wrapper">
            <h1 className="title"><strong>Part 3. 추천결과</strong></h1>
            <Stack gap={5}>
                {recommendations.length === 0 ? (
                    <div style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>
                        추천 결과가 없습니다.
                    </div>
                ) : (
                    <ListGroup as="ol" numbered>
                        {recommendations.map((item, index) => (
                            <ListGroup.Item as="li" key={index}>
                                <Row className="align-items-center">
                                    <Col>
                                        <strong>{item.카페명}</strong>
                                        <div>{item.음료명}</div>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        {<img src={`http://localhost:5000/${item['이미지 경로']}`} alt={item.음료명}
                                        className="drink-image" style={{ width: '50px', borderRadius: '50px' }}/>}
                                    </Col>
                                </Row>

                                <br/>

                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>칼로리(kcal)</th>
                                                <th>당류(g)</th>
                                                <th>포화지방(g)</th>
                                                <th>카페인(mg)</th>
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
                )}
            </Stack>
            <div className="button-container my-4 align-items-center justify-content-center d-flex">
                <Button style={{ backgroundColor: '#FFEE56', borderColor: '#FFEE56', margin: '5px', color: 'black' }} onClick={() => navigate('/result2')}>
                    더 추천받기
                </Button>{' '}
                <Button style={{ backgroundColor: '#FFEE56', borderColor: '#FFEE56', margin: '5px', color: 'black' }} onClick={() => navigate('/')}>
                    결과 확인완료
                </Button>{' '}
            </div>
        </div>
    );
}

export default Result1;
