import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const MainPage: React.FC = () => {
  const location = useLocation()
  const [backgroundColor, setBackgroundColor] = useState<string>('') // New state for background color

  useEffect(() => {
    // Check if there is a color parameter in the URL and set it as the selected color
    const params = new URLSearchParams(location.search)
    const colorParam = params.get('color')

    if (colorParam) {
      // Fetch colors based on the color parameter
      setBackgroundColor(colorParam) // Set background color
    }
  }, [location.search])

  function hasNumber() {
    if (/\d/.test(backgroundColor)) {
      return '#' + backgroundColor
    } else {
      return backgroundColor
    }
  }

  return (
    <div className="app-container" style={{ backgroundColor: hasNumber() }}>
      <nav>
        <ul>
          <li className="active">
            <Link to="/" onClick={(event) => event.preventDefault()}>
              Main Screen
            </Link>
          </li>
          <li>
            <Link to="/first">Set color #1</Link>
          </li>
          <li>
            <Link to="/second">Set color #2</Link>
          </li>
        </ul>
      </nav>
      <h1
        style={{
          display: 'block',
          textAlign: 'center',
          backgroundColor: 'white',
          marginLeft: '10em',
          marginRight: '10em',
        }}
      >
        Wellcome to the theme picker application
      </h1>
    </div>
  )
}

export default MainPage
