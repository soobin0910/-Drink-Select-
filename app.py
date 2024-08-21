import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# 피클 파일을 로드 (음료 데이터)
df = pd.read_pickle('data/cafe_re.pkl')

# 카페 목록 및 음료 리스트 제공 API
@app.route('/api/menus/<string:cafe_name>', methods=['GET'])
def get_menus(cafe_name):
    # 카페명으로 필터링
    filtered_df = df[df['카페명'] == cafe_name]
    menu_list = filtered_df[['카페명', '음료명','이미지 경로']].to_dict(orient='records')
    
    return jsonify(menu_list)

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
                     (df['커피유무'] != coffee)]
    
    # 칼로리와 당류 특성만 추출하여 스케일링 (표준화)
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(filtered_df[['칼로리', '당류']])

    # 스케일링된 칼로리와 당류를 데이터프레임에 반영
    filtered_df['scaled_calories'] = scaled_features[:, 0]
    filtered_df['scaled_sugar'] = scaled_features[:, 1]

    # 입력받은 칼로리와 당류 값도 스케일링
    target_scaled = scaler.transform([[max_calories, max_sugar]])[0]

    # 유클리드 거리 계산 (스케일링된 특성으로)
    filtered_df['score'] = np.sqrt((filtered_df['scaled_calories'] - target_scaled[0])**2 + 
                                   (filtered_df['scaled_sugar'] - target_scaled[1])**2)
    
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

    # 선택한 카페 목록과 조건에 맞는 데이터 필터링
    filtered_df = df[(df['카페명'].isin(selected_cafes)) & 
                     (df['카페인유무'] == caffeine) & 
                     (df['커피유무'] != coffee)]
    
    # 칼로리와 당류 특성만 추출하여 스케일링 (표준화)
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(filtered_df[['칼로리', '당류']])

    # 스케일링된 칼로리와 당류를 데이터프레임에 반영
    filtered_df['scaled_calories'] = scaled_features[:, 0]
    filtered_df['scaled_sugar'] = scaled_features[:, 1]

    # 입력받은 칼로리와 당류 값도 스케일링
    target_scaled = scaler.transform([[max_calories, max_sugar]])[0]

    # 유클리드 거리 계산 (스케일링된 특성으로)
    filtered_df['score'] = np.sqrt((filtered_df['scaled_calories'] - target_scaled[0])**2 + 
                                   (filtered_df['scaled_sugar'] - target_scaled[1])**2)
    
    # 가장 가까운 10개 음료 추천
    recommendations = filtered_df.nsmallest(10, 'score')
    recommendations_list = recommendations.to_dict(orient='records')

    # 6~10등 반환
    return jsonify(recommendations_list[5:10])

if __name__ == '__main__':
    app.run(debug=True)