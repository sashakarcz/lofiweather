# lofiweather


## Design
The initial design of this application is based on [Weather Channel Vaporwave](https://www.youtube.com/watch?v=wmGd-cx-dXc).


It will be a rotating display of weather slides set to music. 

The header will contain the logo, name of the slide, current time and date.

The slides will be:
- Current Conditions (focused on specific location)
  - Left Side
    - Temperature
    - Weather (Clear, Cloudy, etc.)
    - Wind (Calm, E 5, etc.)
    - Gusts (None, 25mph, etc.)
  - Right Side
    - Observation location
    - Humidity
    - Dew Point
    - Ceiling
    - Visibility
    - Pressure
- Latest Observations (focused on nearby locations)
  - Table of:
    - Location name
    - Temperature
    - Weather (Clear, Cloudy, etc.)
    - Wind (Calm, E 5, etc.)
- Local Update
  - Text with current conditions
- Local Forecast - Today
  - Text with forecast beginning with "TODAY..."
- Local Forecast - Tonight
  - Text with forecast beginning with "TONIGHT..."
- Local Forecast - Tomorrow
  - Text with forecast beginning with "WEDNESDAY..."
- Extended Forecast
  - 3-day view as columns beginning the day after tomorrow
    - Day of Week (THU, FRI, etc.)
    - Weather Icon
    - Weather (Clear, Cloudy, etc.)
    - Lo (Low Temperature)
    - Hi (High Temperature)
- Almanac
  - Top portion table with
    - Sunrise/Sunset as rows
    - Day of week (Tuesday, Wednesday) as columns
    - Today and Tomorrow
    - specific time of sunrise/sunset
  - Moon Data
    - 4 columns: Full, Last, New, First
    - Moon Phase Icons
    - Date of each phase beneath icons
    - Phases ordered by time
- Regional Observations
  - Map with:
    - Location Name
    - Temperature
    - Weather Icon
- Current Radar
  - Current precipitation map with legend
- Precipitation Forecast
  - Map showing future precipitation totals for next 24h
- Highs Map
  - Map showing future high temperatures
  - Title "Highs Tuesday"
  - Show the next day highs will hit (today if early, tomorrow if later)
- Lows Map
  - Map showing future low temperatures
  - Title "Lows Wednesday"
  - Show the next day lows will hit (today if early, tomorrow if later)
