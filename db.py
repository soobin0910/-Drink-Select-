import pandas as pd
import sqlite3

try:
    # 데이터베이스 연결
    connection = sqlite3.connect('cafe.db')
    cursor = connection.cursor()

    # 테이블 생성 (기존 테이블 삭제 후 재생성)
    cursor.execute('''DROP TABLE IF EXISTS cafe''')  # 기존 테이블이 있으면 삭제
    create_table = '''CREATE TABLE cafe (
                    id INTEGER PRIMARY KEY,
                    카페명 TEXT,
                    음료명 TEXT,
                    칼로리 INTEGER,
                    당류 INTEGER,
                    카페인유무 INTEGER,
                    커피유무 INTEGER,
                    포화지방 INTEGER,
                    카페인 INTEGER
                    );
                   '''
    cursor.execute(create_table)

    # Excel 파일을 읽어와 데이터베이스에 삽입
    excel_file = 'cafe_filled.xlsx'
    df = pd.read_excel(excel_file)  # 단일 시트를 읽음

    # 불필요한 열 제거
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

    # 필요한 열만 포함하는지 확인
    expected_columns = ['카페명', '음료명', '칼로리', '당류', '카페인유무', '커피유무','포화지방','카페인']
    df = df[expected_columns]



    # 데이터 유형 맞추기
    df['칼로리'] = df['칼로리'].astype(int)
    df['당류'] = df['당류'].astype(int)
    df['카페인유무'] = df['카페인유무'].astype(int)
    df['커피유무'] = df['커피유무'].astype(int)
    df['포화지방'] = df['포화지방'].astype(int)
    df['카페인'] = df['카페인'].astype(int)

    df.to_sql('cafe', connection, if_exists='append', index=False)

    # 변경사항 커밋
    connection.commit()

    # 데이터 확인
    select_all_query = "SELECT * FROM cafe"
    cursor.execute(select_all_query)
    rows = cursor.fetchall()

    # 데이터 출력
    for r in rows:
        print(r)

    # 연결 종료
    connection.close()

except sqlite3.Error as error:
    print("SQLite 오류:", error)

except FileNotFoundError:
    print("파일을 찾을 수 없습니다: 'cafe.xlsx' 파일이 현재 디렉토리에 있는지 확인하세요.")
except Exception as e:
    print("예기치 않은 오류가 발생했습니다:", e)
