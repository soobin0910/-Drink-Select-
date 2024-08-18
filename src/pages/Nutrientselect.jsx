import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/nutrientselect.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const Nutrientselect = () => {
    const navigate = useNavigate();

    const [calorieValue, setCalorieValue] = useState(0);
    const [sugarValue, setSugarValue] = useState(0);

    const handleConfirmClick = () => {
        navigate('/result1');
    }

    return (
        <div className="container">
            <header className="header">
                <h1>영양성분 선택</h1>
            </header>
            <div className="content" style={{ display: 'flex', alignItems: 'center' }}>
                <span>영양성분 선택</span>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">칼로리에 대한 설명?</Tooltip>}>
                    <span className="d-inline-block" style={{ marginLeft: '5px' }}>
                        <Button disabled style={{ pointerEvents: 'none', backgroundColor: '#FFEE56', borderColor: '#FFEE56' }}>
                            ?
                        </Button>
                    </span>
                </OverlayTrigger>
            </div>
            <Form className="content">
                <Form.Group className="form-group">
                    <Form.Label className="form-label">칼로리: {calorieValue} kcal</Form.Label>
                    <RangeSlider 
                        value={calorieValue}
                        min={0}
                        max={942}
                        step={1}
                        tooltip='on'  // 말풍선 형태로 수치 표시
                        tooltipLabel={(currentValue) => `${currentValue} kcal`}  // 말풍선 내용 형식 지정
                        onChange={(e) => setCalorieValue(e.target.value)} 
                        className="range-slider"
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">당류: {sugarValue} g</Form.Label>
                    <RangeSlider 
                        value={sugarValue}
                        min={0}
                        max={217}
                        step={1}
                        tooltip='on'  // 말풍선 형태로 수치 표시
                        tooltipLabel={(currentValue) => `${currentValue} g`}  // 말풍선 내용 형식 지정
                        onChange={(e) => setSugarValue(e.target.value)} 
                        className="range-slider"
                    />
                </Form.Group>
            </Form>
            <div className="content">
                <div style={{ marginBottom: '10px' }}>카페인 유무 선택</div>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton 
                        id="tbg-radio-2" 
                        value={1} 
                        style={{ 
                            backgroundColor: '#FFEE56', 
                            borderColor: '#FFEE56', 
                            color: '#000', 
                            marginRight: '5px',
                            borderRadius: '10px'  
                        }}
                    >
                        예
                    </ToggleButton>
                    <ToggleButton 
                        id="tbg-radio-3" 
                        value={2} 
                        style={{ 
                            backgroundColor: '#FFEE56', 
                            borderColor: '#FFEE56', 
                            color: '#000',
                            borderRadius: '10px'  
                        }}
                    >
                        아니오
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Form className="content">
                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check // prettier-ignore
                            type={type}
                            id={`default-${type}`}
                            label="커피 제외하기"
                        />
                    </div>
                ))}
            </Form>
            <Button 
                className="content" 
                variant="warning" 
                onClick={handleConfirmClick}
                style={{ backgroundColor: '#FFEE56', borderColor: '#FFEE56', color: '#000' }}
            >
                확인
            </Button>
        </div>
    );
}

export default Nutrientselect;
