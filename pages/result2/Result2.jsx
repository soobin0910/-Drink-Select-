import React from 'react';
import "./result2.css";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Result2 = () => {
    const navigate = useNavigate();

    return (
        <div>
                        <header className="header">
                <h1>재추천결과</h1>
            </header>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
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
                <Button variant="warning" >결과 확인완료</Button>{' '}
        </div>
    );
}

export default Result2;