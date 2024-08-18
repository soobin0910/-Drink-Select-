import { useEffect } from 'react'; // 추가
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const Result1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const recommendations = location.state?.recommendations || [];

    useEffect(() => {
        console.log('Recommendations:', recommendations); // 데이터가 제대로 들어오는지 확인
    }, [recommendations]);

    const handleConfirmClick = () => {
        navigate('/result2');
    }

    return (
        <div>
            <header className="header">
                <h1>추천결과</h1>
            </header>
            <div className="card-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                {recommendations.length > 0 ? (
                    recommendations.map((drink, index) => (
                        <Card style={{ width: '18rem' }} key={index}>
                            <Card.Img variant="top" src={drink.image || 'default_image_url'} />
                            <Card.Body>
                                <Card.Title>{drink.카페명}</Card.Title>
                                <Card.Text>
                                    {drink.음료명}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>칼로리: {drink.칼로리} kcal</ListGroup.Item>
                                <ListGroup.Item>당류: {drink.당류} g</ListGroup.Item>
                                <ListGroup.Item>포화지방: {drink.포화지방} g</ListGroup.Item>
                                <ListGroup.Item>카페인: {drink.카페인} mg</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))
                ) : (
                    <p>추천 결과가 없습니다.</p>
                )}
            </div>
            <div className="button-container">
                <Button variant="warning" onClick={() => navigate('/')}>결과 확인완료</Button>{' '}
                <Button variant="warning" onClick={handleConfirmClick}>더 추천받기</Button>{' '}
            </div>
        </div>
    );
}

export default Result1;
