import '../css/result1.css';
import ListGroup from 'react-bootstrap/ListGroup';  // ListGroup 한 번만 임포트
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

const Result1 = () => {
    const navigate = useNavigate();

    const handleConfirmClick = () => {
        navigate('/result2');
    }

    return (
        <div>
            <header className="header">
                <h1>추천결과</h1>
            </header>
            <Stack gap={5}>
                <ListGroup as="ol" numbered>
                    <ListGroup.Item as="li">
                        카페명
                        <div>  음료명</div>
            <div><Table striped bordered hover>
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
          <td>수치1</td>
          <td>수치2</td>
          <td>수치3</td>
          <td>수치4</td>
        </tr>
      </tbody>
    </Table></div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                        카페명
                        <div>  음료명</div>
            <div><Table striped bordered hover>
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
          <td>수치1</td>
          <td>수치2</td>
          <td>수치3</td>
          <td>수치4</td>
        </tr>
      </tbody>
    </Table></div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                        카페명
                        <div>  음료명</div>
            <div><Table striped bordered hover>
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
          <td>수치1</td>
          <td>수치2</td>
          <td>수치3</td>
          <td>수치4</td>
        </tr>
      </tbody>
    </Table></div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                        카페명
                        <div>  음료명</div>
            <div><Table striped bordered hover>
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
          <td>수치1</td>
          <td>수치2</td>
          <td>수치3</td>
          <td>수치4</td>
        </tr>
      </tbody>
    </Table></div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                        카페명
                        <div>  음료명</div>
            <div><Table striped bordered hover>
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
          <td>수치1</td>
          <td>수치2</td>
          <td>수치3</td>
          <td>수치4</td>
        </tr>
      </tbody>
    </Table></div>
                        </ListGroup.Item>
                </ListGroup>
            </Stack>
            {/* 버튼과 카드 사이에 간격을 두기 위해 button-container 클래스 사용 */}
            <div className="button-container">
                <Button variant="warning">결과 확인완료</Button>{' '}
                <Button variant="warning" onClick={handleConfirmClick}>더 추천받기</Button>{' '}
            </div>
        </div>
    );
}

export default Result1;
