from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def scrape_news():
    url = "https://trinitynews.ie/"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    posts = soup.find_all("h3", class_="entry-title")

    news = []
    for post in posts:
        title_tag = post.find("a")
        if title_tag:
            title = title_tag.text.strip()
            link = title_tag["href"]
            news.append({"title": title, "link": link})
    
    return news

@app.route('/news', methods=['GET'])
def get_news():
    return jsonify(scrape_news())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

