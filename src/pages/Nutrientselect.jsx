import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/nutrientselect.css';
import { Tooltip, OverlayTrigger, Col, Row, Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const Nutrientselect = () => {
    const navigate = useNavigate();

    const [calorieValue, setCalorieValue] = useState(0);
    const [sugarValue, setSugarValue] = useState(0);
    const [caffeine, setCaffeine] = useState(1);  // 카페인 유무 상태
    const [excludeCoffee, setExcludeCoffee] = useState(0); // 커피 제외 여부 상태

    const handleConfirmClick = () => {
        // 선택된 옵션을 로컬 스토리지에 저장
        localStorage.setItem('calorieValue', calorieValue);
        localStorage.setItem('sugarValue', sugarValue);
        localStorage.setItem('caffeine', caffeine);
        localStorage.setItem('excludeCoffee', excludeCoffee);

        // result1 페이지로 이동
        navigate('/result1');
    }

    const getButtonStyle = (buttonValue) => {
        return {
            backgroundColor: caffeine === buttonValue ? '#FFEE56' : '#D9D9D9',
            borderColor: caffeine === buttonValue ? '#FFEE56' : '#D9D9D9',
            color: '#000',
            marginRight: buttonValue === 1 ? '5px' : '0',
            borderRadius: '10px'
        };
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
            &apos;예&apos;를 누르면 카페인 상관 없이 모든 음료가 추천됩니다!
        </Tooltip>
    );

    return (
        <div className="body-wrapper">
            <h1 className="title" style={{marginBottom: '100px'}}><strong>Part 2. 영양성분 선택</strong></h1>
                <Form.Group style={{ width: '70%', marginBottom: '100px'}}>
                    <Form.Label style={{ fontSize: '25px' }}>칼로리: {calorieValue} kcal</Form.Label>
                    <RangeSlider 
                        value={calorieValue}
                        min={0}
                        max={942}
                        step={1}
                        tooltip='on'  // 말풍선 형태로 수치 표시
                        tooltipLabel={(currentValue) => `${currentValue} kcal`}  // 말풍선 내용 형식 지정
                        onChange={(e) => setCalorieValue(e.target.value)} 
                        className="range-slider"
                        style={{ width: '100%'}}
                    />
                </Form.Group>
                <Form.Group style={{ width: '70%'}}>
                    <Form.Label style={{ fontSize: '25px' }}>당류: {sugarValue} g</Form.Label>
                    <RangeSlider 
                        value={sugarValue}
                        min={0}
                        max={217}
                        step={1}
                        tooltip='on'  // 말풍선 형태로 수치 표시
                        tooltipLabel={(currentValue) => `${currentValue} g`}  // 말풍선 내용 형식 지정
                        onChange={(e) => setSugarValue(e.target.value)} 
                        className="range-slider"
                        style={{ width: '100%'}}
                    />
                </Form.Group>
            <div>
            <div style={{ marginBottom: '10px', marginTop: '30px', fontSize: '25px' }}>
                <Row className="align-items-center">
                <Col className="px-0">
          <p className="mb-0">카페인 유무 선택</p>
        </Col>
        <Col xs="auto" className="px-1">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 300 }}
            overlay={renderTooltip}
          >
            <span>
            <Image src="questionmark.png" style={{ width: '30px', height: '30px'}}/>
            </span>
          </OverlayTrigger>
        </Col>
      </Row>
    </div>
                <ToggleButtonGroup 
                    type="radio" 
                    name="options" 
                    value={caffeine} 
                    onChange={(val) => setCaffeine(val)}
                    style={{ width: '100%', marginBottom: '40px'}}
                >
                    <ToggleButton 
                        id="tbg-radio-2" 
                        value={1} 
                        style={getButtonStyle(1)}
                    >
                        예
                    </ToggleButton>
                    <ToggleButton 
                        id="tbg-radio-3" 
                        value={0} 
                        style={getButtonStyle(0)}
                    >
                        아니오
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
                <Form.Check 
                    type="checkbox"
                    id="default-checkbox"
                    label={<span style={{ fontSize: '20px'}}>커피 제외하기</span>}
                    checked={excludeCoffee === 1}
                    onChange={(e) => setExcludeCoffee(e.target.checked ? 1 : 0)}
                />
            <Button 
                variant="warning" 
                onClick={handleConfirmClick}
                style={{ backgroundColor: '#FFEE56', borderColor: '#FFEE56', color: '#000', marginTop: '30px', marginBottom: '120px', fontSize: '20px'}}
                
            >
                확인
            </Button>
        </div>
    );
}

export default Nutrientselect;
