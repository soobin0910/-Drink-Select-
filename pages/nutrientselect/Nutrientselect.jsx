import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 임포트
import "./nutrientselect.css";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Nutrientselect = () => {
    const navigate = useNavigate();  // useNavigate 훅 사용

    const handleConfirmClick = () => {
        navigate('/result1');  // '/result1' 경로로 이동
    }

    return (
        <div>
            <header className="header">
                <h1>영양성분 선택</h1>
            </header>
            <div className="content">
                영양성분 선택
            </div>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">칼로리에 대한 설명?</Tooltip>}>
                <span className="d-inline-block">
                    <Button disabled style={{ pointerEvents: 'none' }}>
                        ?
                    </Button>
                </span>
            </OverlayTrigger>
            <Form className="content">
                <Form.Group className="form-group">
                    <Form.Label className="form-label">칼로리</Form.Label>
                    <Form.Range id="calorie-range" />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">당류</Form.Label>
                    <Form.Range id="sugar-range" />
                </Form.Group>
            </Form>
            <div className="content">
                카페인 유무 선택   
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton id="tbg-radio-2" value={1}>
                        예
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-3" value={2}>
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
            {/* 버튼 클릭 시 handleConfirmClick 함수 호출 */}
            <Button className="content" variant="warning" onClick={handleConfirmClick}>확인</Button>{' '}
        </div>
    );
}

export default Nutrientselect;
