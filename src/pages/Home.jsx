import { Container, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home() {

  const navigate = useNavigate();

  return (
    <div className="body-content">
    <Container className="text-center p-3" fluid>
      <h1 className="name"><strong>DRINK SELECT</strong></h1>
      <Row className="justify-content-center">
        <Button className="custom-button my-3" onClick={() => navigate('/part1')}>
            <h3><strong>음료 추천</strong></h3>
        </Button>
        <Button className="custom-button my-3" onClick={() => navigate('/cafeselect')}>
            <h3><strong>카페 메뉴 보기</strong></h3>
        </Button>
      </Row>
    </Container>
    </div>
  );
}

export default Home;
