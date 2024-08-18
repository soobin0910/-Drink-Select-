import pandas as pd
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# 피클 파일을 로드 (음료 데이터)
df = pd.read_pickle('data/cafe.pkl')

# 음료 추천을 처리하는 API
@app.route('/api/recommend', methods=['POST'])
def recommend():
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

    # 1~5등 반환
    return jsonify(recommendations_list[:5])

# 재추천 API
@app.route('/api/recommend/more', methods=['POST'])
def recommend_more():
    data = request.json
    selected_cafes = data['cafes']
    caffeine = data['caffeine']
    coffee = data['coffee']
    max_calories = data['calories']
    max_sugar = data['sugar']

    filtered_df = df[(df['카페명'].isin(selected_cafes)) & 
                     (df['카페인유무'] == caffeine) & 
                     (df['커피유무'] == coffee)]
    
    filtered_df['score'] = np.sqrt((filtered_df['칼로리'] - max_calories)**2 + 
                                   (filtered_df['당류'] - max_sugar)**2)
    
    recommendations = filtered_df.nsmallest(10, 'score')
    recommendations_list = recommendations.to_dict(orient='records')

    # 6~10등 반환
    return jsonify(recommendations_list[5:10])

if __name__ == '__main__':
    app.run(debug=True)
