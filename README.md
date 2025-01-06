# WeatherScope-Kenya 🌦️

**WeatherScope Kenya** is a web application designed to provide real-time weather updates and forecasts for cities across Kenya. It integrates data from OpenWeatherMap's One Call API to deliver accurate weather insights.  

![Application Screenshot](<Screenshot from 2025-01-06 16-30-25.png>)  

---

## Features  
- **Real-time Weather Updates**: Displays current temperature, weather conditions, and location.  
- **Search Functionality**: Users can search for weather details by entering the city and an optional region.  
- **Pagination**: Navigate through weather query results efficiently.  
- **CSV Export**: Download weather queries as a CSV file for offline use.  

---

## Technologies Used  

### Backend  
- **Django**: For server-side logic and API development.  
- **Sqlite3**: Default django's database for storing query history.  
- **OpenWeatherMap API**: For weather and forecast data.  

### Frontend  
- **React**: For a dynamic and interactive user interface.  
- **Axios**: To make API requests seamlessly.  
- **CSS**: For styling the application, with a light blue theme.  

---

## Project Setup  

### Prerequisites  
1. Python 3.x  
2. Node.js and npm   

### Backend Setup  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/WeatherScope-Kenya.git
   cd WeatherScope-Kenya/backend

2. Set up a virtual environment:
    ```bash
    python -m venv (your_environment_name)
    source (your_environment_name)/bin/activate # for linux/mac
    (your_environment_name)\Scripts\activate # for windows

3. Install dependancies:
    ```bash
    pip freeze>requirements.txt
    pip install -r requirements.txt

4. Run migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate

5. Start development server:
    ```bash
    python manage.py runserver

### Frontend Setup
1. Navigate to the frontend folder:
    ```bash
    cd ../frontend

2. Install dependancies
    ```bash
    npm install

3. Start the React development server:
    ```bash 
    npm start

## API Integration
The project integrates OpenWeatherMap's One Call API for weather data
- Sign up and get your API key from OpenWeatherMap.
- Add the API key to your django services(services.py) under `API_KEY`

## Usage
1. Open the application in your browser: `http:localhost:3000`
2. Enter the city name and optionally the region, then click Get Weather.
3. View real-time weather details of your city choice.

## Screenshot
![alt text](<Screenshot from 2025-01-06 16-30-25.png>)

## Future Enhancements
- Add machine learning for weather predictions.
- Integrate authentication for personalized user experiences.
- Deploy the application for public use.

## License
This project is licensed under the MIT License.