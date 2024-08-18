import pandas as pd
import numpy as np
from flask import Flask, request, jsonify, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 세션을 위한 시크릿 키 설정

# 피클 파일을 로드 (음료 데이터)
df = pd.read_pickle('data/cafe.pkl')

# 음료 추천을 처리하는 API
@app.route('/api/recommend', methods=['POST'])
def recommend():
    # 프론트엔드에서 전송된 JSON 데이터를 받음
    data = request.json
    selected_cafes = data['cafes']
    caffeine = data['caffeine']
    coffee = data['coffee']
    max_calories = data['calories']
    max_sugar = data['sugar']

    # 선택한 카페 목록과 조건에 맞는 데이터 필터링
    filtered_df = df[(df['카페명'].isin(selected_cafes)) & 
                     (df['카페인유무'] == caffeine) & 
                     (df['커피유무'] == coffee)]
    
    # 유클리드 거리 계산
    filtered_df['score'] = np.sqrt((filtered_df['칼로리'] - max_calories)**2 + 
                                   (filtered_df['당류'] - max_sugar)**2)
    
    # 가장 가까운 10개 음료 추천
    recommendations = filtered_df.nsmallest(10, 'score')
    recommendations_list = recommendations.to_dict(orient='records')

    # 상위 1~10등을 세션에 저장
    session['recommendations'] = recommendations_list

    # 1~5등을 반환
    return jsonify(recommendations_list[:5])

# 재추천을 처리하는 API
@app.route('/api/recommend/more', methods=['GET'])
def recommend_more():
    # 세션에서 저장된 추천 리스트를 불러옴
    recommendations_list = session.get('recommendations', [])

    if not recommendations_list:
        return jsonify({'error': 'No recommendations found. Please request recommendations first.'}), 400
    
    # 6~10등을 반환
    return jsonify(recommendations_list[5:10])

if __name__ == '__main__':
    app.run(debug=True)

