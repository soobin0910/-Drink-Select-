import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # 모든 경로에 대해 모든 출처 허용

# 피클 파일을 로드 (음료 데이터)
df = pd.read_pickle('data/cafe.pkl')

# 음료 추천을 처리하는 API
@app.route('/api/recommend', methods=['POST'])
def recommend():
    try:
        print("Received request data:", request.json)  # 요청 데이터 출력

        # 프론트엔드에서 전송된 JSON 데이터를 받음
        data = request.json
        selected_cafes = data.get('cafes', [])  # 선택한 카페 목록
        caffeine = data.get('caffeine', 1)  # 카페인 포함 여부 (1: 포함, 0: 제외)
        coffee = data.get('coffee', 1)  # 커피 포함 여부 (1: 포함, 0: 제외)
        max_calories = data.get('calories', 942)  # 최대 칼로리 (기본값 942)
        max_sugar = data.get('sugar', 217)  # 최대 당류 (기본값 217)

        print("Filtering data...")  # 필터링 시작 로그

        # 선택한 카페 목록과 조건에 맞는 데이터 필터링
        filtered_df = df[(df['카페명'].isin(selected_cafes)) &
                         (df['카페인유무'] == caffeine) & 
                         (df['커피유무'] == coffee)]
        
        if filtered_df.empty:
            print("No matching drinks found.")  # 필터링 결과가 비어있을 때의 로그
            return jsonify({"error": "No matching drinks found"}), 404

        print("Calculating Euclidean distances...")  # 거리 계산 로그

        # 유클리드 거리 계산
        filtered_df['score'] = np.sqrt((filtered_df['칼로리'] - max_calories)**2 + 
                                       (filtered_df['당류'] - max_sugar)**2)
        
        print("Selecting top 5 recommendations...")  # 추천 결과 선택 로그

        # 가장 가까운 5개 음료 추천
        recommendations = filtered_df.nsmallest(5, 'score')

        print("Recommendations found:", recommendations)  # 추천 결과 로그

        # JSON 형식으로 응답 반환
        return jsonify(recommendations.to_dict(orient='records'))
    except Exception as e:
        print("Error occurred:", str(e))  # 에러 로그 출력
        return jsonify({"error": str(e)}), 500  # 서버 에러를 반환

# 선택한 카페의 메뉴를 가져오는 API
@app.route('/api/menus/<cafe_id>', methods=['GET'])
def get_menus(cafe_id):
    try:
        print("Getting menus for cafe:", cafe_id)  # 카페 메뉴 조회 로그

        # 선택한 카페에 해당하는 메뉴 데이터를 필터링
        cafe_menus = df[df['카페명'] == cafe_id]

        # 필요한 데이터를 JSON 형식으로 변환하여 반환
        menus = cafe_menus[['음료명', '이미지']].rename(columns={'음료명': 'name', '이미지': 'image'}).to_dict(orient='records')

        print("Menus found:", menus)  # 조회된 메뉴 로그

        return jsonify(menus)
    except Exception as e:
        print("Error occurred:", str(e))  # 에러 로그 출력
        return jsonify({"error": str(e)}), 500  # 서버 에러를 반환

if __name__ == '__main__':
    app.run(debug=True)
