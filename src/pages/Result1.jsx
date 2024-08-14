import '../css/result1.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Result1 = () => {
    const navigate = useNavigate();  // useNavigate 훅 사용

    const handleConfirmClick = () => {
        navigate('/result2');  // '/result2' 경로로 이동
    }

    return (
        
        <div>
            <header className="header">
                <h1>추천결과</h1>
            </header>
            <div className="card-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                {[...Array(5)].map((_, index) => (
                    <Card style={{ width: '18rem' }} key={index}>
                        <Card.Img variant="top" src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fdnvefa72aowie.cloudfront.net%2Forigin%2Farticle%2F202212%2Fb1d185f9edcee97179b63051ad1f6d7a25cc7066054103c32d93a091821809ce.webp%3Ff%3Dwebp%26q%3D95%26s%3D1440x1440%26t%3Dinside&type=sc960_832" />
                        <Card.Body>
                            <Card.Title>스타벅스</Card.Title>
                            <Card.Text>
                                아이스 아메리카노
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>칼로리</ListGroup.Item>
                            <ListGroup.Item>당류</ListGroup.Item>
                            <ListGroup.Item>포화지방</ListGroup.Item>
                            <ListGroup.Item>카페인</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))}
            </div>
            {/* 버튼과 카드 사이에 간격을 두기 위해 card-container 클래스 사용 */}
            <div className="button-container">
                <Button variant="warning" >결과 확인완료</Button>{' '}
                <Button variant="warning" onClick={handleConfirmClick}>더 추천받기</Button>{' '}
            </div>
        </div>
    );
}

export default Result1;