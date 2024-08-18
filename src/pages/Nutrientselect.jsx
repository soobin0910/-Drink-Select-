import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/nutrientselect.css';
import axios from 'axios';

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

    const [calorieValue, setCalorieValue] = useState(500);
    const [sugarValue, setSugarValue] = useState(20);
    const [caffeineValue, setCaffeineValue] = useState(1);  // 1: 예, 0: 아니오
    const [coffeeExcluded, setCoffeeExcluded] = useState(false);

    const handleConfirmClick = async () => {
        try {
            // API 요청을 위해 절대 경로 사용
            const response = await axios.post('http://localhost:5000/api/recommend', {
                cafes: [],  // 여기에 선택된 카페 목록을 전달할 수 있습니다.
                caffeine: caffeineValue,
                coffee: coffeeExcluded ? 0 : 1,
                calories: calorieValue,
                sugar: sugarValue,
            });

            // 백엔드에서 받아온 추천 결과를 결과 페이지로 전달
            navigate('/result1', { state: { recommendations: response.data } });
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };

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
                        tooltip='on'
                        tooltipLabel={(currentValue) => `${currentValue} kcal`}
                        onChange={(e) => setCalorieValue(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">당류: {sugarValue} g</Form.Label>
                    <RangeSlider 
                        value={sugarValue}
                        min={0}
                        max={217}
                        step={1}
                        tooltip='on'
                        tooltipLabel={(currentValue) => `${currentValue} g`}
                        onChange={(e) => setSugarValue(e.target.value)} 
                    />
                </Form.Group>
            </Form>
            <div className="content">
                <div style={{ marginBottom: '10px' }}>카페인 유무 선택</div>
                <ToggleButtonGroup 
                    type="radio" 
                    name="caffeine-options" 
                    defaultValue={caffeineValue}
                    onChange={(value) => setCaffeineValue(value)}
                >
                    <ToggleButton 
                        id="tbg-radio-1" 
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
                        id="tbg-radio-2" 
                        value={0} 
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
                        <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label="커피 제외하기"
                            checked={coffeeExcluded}
                            onChange={(e) => setCoffeeExcluded(e.target.checked)}
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
