import pandas as pd
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# 피클 파일을 로드 (음료 데이터)
df = pd.read_pickle('data/cafe.pkl')

# 음료 추천을 처리하는 API
@app.route('/api/recommend', methods=['POST'])
def recommend():
    # 프론트엔드에서 전송된 JSON 데이터를 받음
    data = request.json
    selected_cafes = data.get('cafes', [])
    caffeine = data.get('caffeine', 1)  # 기본값: 카페인 있음
    coffee = data.get('coffee', 1)  # 기본값: 커피 있음
    max_calories = data.get('calories', 942)  # 기본 최대 칼로리
    max_sugar = data.get('sugar', 217)  # 기본 최대 당류

    # 선택한 카페 목록과 조건에 맞는 데이터 필터링
    filtered_df = df[(df['카페명'].isin(selected_cafes)) & 
                     (df['카페인유무'] == caffeine) & 
                     (df['커피유무'] == coffee)]
    
    # 유클리드 거리 계산
    filtered_df['score'] = np.sqrt((filtered_df['칼로리'] - max_calories)**2 + 
                                   (filtered_df['당류'] - max_sugar)**2)
    
    # 가장 가까운 5개 음료 추천
    recommendations = filtered_df.nsmallest(5, 'score')

    # JSON 형식으로 응답 반환
    return jsonify(recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
