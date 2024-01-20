import requests
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import json
import sys

def get_github_data(username, token):
    endpoint = 'https://api.github.com/graphql'
    headers = {
        'Authorization': f'Bearer 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',
    }

    # GraphQL query to retrieve data
    query = f"""
    query {{
      user(login: "{username}") {{
        repositories(first: 100) {{
          nodes {{
            name
            object(expression: "master:") {{
              ... on Commit {{
                history(first: 10) {{
                  edges {{
                    node {{
                      message
                    }}
                  }}
                }}
              }}
            }}
            readme: object(expression: "master:README.md") {{
              ... on Blob {{
                text
              }}
            }}
            issues(first: 10) {{
              nodes {{
                title
              }}
            }}
            pulls: pullRequests(first: 10) {{
              nodes {{
                title
              }}
            }}
          }}
        }}
      }}
    }}
    """

    response = requests.post(endpoint, json={'query': query}, headers=headers)
    return response.json()

def extract_text_from_json(json_string):
    try:
        # Parse the JSON string into a Python dictionary
        data = json_string
        print(data)
        # Function to recursively traverse the dictionary and extract text values
        def traverse(obj):
            if isinstance(obj, str):
                return obj
            elif isinstance(obj, list):
                return ' '.join(traverse(item) for item in obj)
            elif isinstance(obj, dict):
                return ' '.join(traverse(value) for value in obj.values())
            else:
                return ''

        # Extract text from the parsed JSON data
        all_text = traverse(data)
        return all_text

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return ''

def generate_word_cloud(data):
    all_text = extract_text_from_json(data)
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(all_text)
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.show()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <github_username>")
        sys.exit(1)

    github_username = sys.argv[1]
    github_token = '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'

    github_data = get_github_data(github_username, github_token)
    generate_word_cloud(github_data)
