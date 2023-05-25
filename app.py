import streamlit as st

def main():
    # Charger le contenu HTML, CSS et JavaScript
    with open('index.html', 'r') as f:
        html_code = f.read()

    # Display the HTML code as Markdown
    st.markdown(html_code, unsafe_allow_html=True)

if __name__ == '__main__':
    main()
