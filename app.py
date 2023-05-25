import streamlit as st

def main():
    # Charger le contenu HTML, CSS et JavaScript
    with open('index.html', 'r') as f:
        html_code = f.read()

    # Afficher le contenu HTML dans l'application Streamlit
    st.components.v1.html(html_code, height=600, scrolling=True)

if __name__ == '__main__':
    main()
