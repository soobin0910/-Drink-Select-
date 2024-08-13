import pandas as pd
import numpy as np
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# 피클 파일을 로드
df = pd.read_pickle('data/cafe.pkl')

@app.route('/')
def index():
    # 카페 이름 목록을 추출하여 템플릿으로 전달
    cafes = df['카페명'].unique().tolist()
    return render_template('index.html', cafes=cafes)

@app.route('/recommend', methods=['POST'])
def recommend():
    # 사용자 입력 값 가져오기
    selected_cafes = request.form.getlist('cafe_name')  # 여러 카페 선택 지원
    caffeine = int(request.form['caffeine'])  # 0 또는 1
    coffee = int(request.form['coffee'])  # 0 또는 1 (커피 유무)
    max_calories = int(request.form['calories'])
    max_sugar = int(request.form['sugar'])

    # 선택한 카페 목록과 조건에 맞는 데이터 필터링
    filtered_df = df[(df['카페명'].isin(selected_cafes)) & 
                     (df['카페인유무'] == caffeine) & 
                     (df['커피유무'] == coffee)]  # 커피 유무 필터링 추가
                    
    
    # 유클리드 거리 계산
    filtered_df['score'] = np.sqrt((filtered_df['칼로리'] - max_calories)**2 + (filtered_df['당류'] - max_sugar)**2)
    
    # 가장 가까운 5개 음료 추천
    recommendations = filtered_df.nsmallest(5, 'score')

    # JSON 형식으로 응답 반환
    return jsonify(recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
