from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import numpy as np

app = Flask(__name__)

# 피클 파일을 로드 (음료 데이터)
df = pd.read_pickle('data/cafe.pkl')

# 시작 페이지
@app.route('/')
def start():
    return render_template('start.html')

# 메인 화면 (음료 추천 또는 카페 메뉴 보기)
@app.route('/main')
def main():
    return render_template('main.html')

# 카페 선택 페이지
@app.route('/select_cafe', methods=['GET', 'POST'])
def select_cafe():
    if request.method == 'POST':
        selected_cafes = request.form.getlist('cafes')
        # 리스트를 쿼리 문자열로 전달
        return redirect(url_for('select_nutrition') + f"?cafes={','.join(selected_cafes)}")
    cafes = df['카페명'].unique()
    return render_template('select_cafe.html', cafes=cafes)

# 영양성분 선택 페이지
@app.route('/select_nutrition', methods=['GET', 'POST'])
def select_nutrition():
    if request.method == 'POST':
        selected_cafes = request.args.get('cafes').split(',')
        caffeine = int(request.form['caffeine'])
        coffee = int(request.form['coffee'])
        desired_calories = int(request.form['calories'])
        desired_sugar = int(request.form['sugar'])

        filtered_df = df[(df['카페명'].isin(selected_cafes)) & 
                         (df['카페인유무'] == caffeine) & 
                         (df['커피유무'] == coffee)]
        
        filtered_df['score'] = np.sqrt((filtered_df['칼로리'] - desired_calories)**2 + 
                                       (filtered_df['당류'] - desired_sugar)**2)
        
        recommendations = filtered_df.nsmallest(5, 'score')

        return render_template('show_results.html', recommendations=recommendations.to_dict(orient='records'))
    
    return render_template('select_nutrition.html')

# 추천 결과 페이지
@app.route('/show_results')
def show_results():
    return render_template('show_results.html')

# 완료 페이지
@app.route('/completed')
def completed():
    return render_template('completed.html')

if __name__ == '__main__':
    app.run(debug=True)
