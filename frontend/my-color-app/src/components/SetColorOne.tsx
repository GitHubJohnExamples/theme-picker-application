import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { getDifferenceBlendColor, hasNumber } from '../utils/colorUtils'

const SetColorOne: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [routeColorOne, setRouteColor] = useState<
    { name: string; rgb: string }[]
  >([])
  const [options, setOptions] = useState<{ label: string; value: any }[]>([])
  const selectRef = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const hasNumberResult = hasNumber(backgroundColor)
  const navigate = useNavigate()
  const location = useLocation()
  const routeColorTwoRef = useRef<{ name: string; rgb: string }[]>(
    location.state && location.state.routeColorTwo
      ? location.state.routeColorTwo
      : []
  )
  const routeColorTwo = routeColorTwoRef.current

  const fetchColors = async (searchQuery: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3001/colors?q=${searchQuery}`
      )
      const data = await response.json()
      // Update options based on filter results
      const newOptions = data.items.map((color: { name: any }) => ({
        label: color.name,
        value: color,
      }))
      setOptions(newOptions)
    } catch (error) {
      console.error('Error fetching colors:')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (inputValue: string, { action }: any) => {
    if (action === 'input-change') {
      setQuery(inputValue)

      // Fetch colors based on the input value
      fetchColors(inputValue)
    }
  }

  const handleSelectChange = (selectedOption: any) => {
    setQuery(selectedOption?.label || '')
    setSelectedColor(selectedOption?.value?.rgb || null)
    setRouteColor(selectedOption?.value)

    // Update the URL with the selected color
    const newUrl = selectedOption
      ? `/first?color=${encodeURIComponent(selectedOption.label)}`
      : '/first'

    //navigate('/second', { state: { routeColorOne: selectedOption?.value } })
    navigate(newUrl, { replace: true }) // Use replace to update the URL without creating a new entry in the history
    // window.history.replaceState(null, '', newUrl); // Update URL without triggering a full page reload

    const resultingColor = getDifferenceBlendColor(
      { name: selectedOption?.value?.name, rgb: selectedOption?.value?.rgb },
      { name: routeColorTwo.name, rgb: routeColorTwo.rgb }
    )
    setBackgroundColor(resultingColor ?? '') // Set background color
  }

  useEffect(() => {
    // Check if there is a color parameter in the URL and set it as the selected color
    const params = new URLSearchParams(location.search)
    const colorParam = params.get('color')
    setSelectedColor(colorParam || null)

    // Set the initial query based on the color parameter
    setQuery(colorParam || '')

    if (
      colorParam &&
      Array.isArray(routeColorOne) &&
      !routeColorOne.some((color) => color.name === colorParam)
    ) {
      // Fetch colors based on the color parameter
      fetchColors(colorParam)
      setBackgroundColor(colorParam) // Set background color
    }
  }, [location.search, routeColorOne])

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
  }, [])

  const customNoOptionsMessage = () => {
    return loading ? null : (
      <div>
        <div>Start typing to see available options...</div>
      </div>
    )
  }

  return (
    <div className="app-container" style={{ backgroundColor: hasNumberResult }}>
      <nav>
        <ul>
          <li>
            <Link to={`/?color=${encodeURIComponent(backgroundColor)}`}>
              Main Screen
            </Link>
          </li>
          <li className="active">
            <Link to="/" onClick={(event) => event.preventDefault()}>
              Set color #1
            </Link>
          </li>
          <li>
            <Link to="/second" state={{ routeColorOne }}>
              {' '}
              Set color #2{' '}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="select-color">
        <h3
          style={{
            display: 'inline-block',
            textAlign: 'center',
            backgroundColor: 'white',
          }}
        >
          Select first color
        </h3>
        <Select
          ref={selectRef}
          options={options}
          isClearable
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          placeholder=""
          value={
            selectedColor
              ? { label: query, value: { rgb: selectedColor } }
              : null
          }
          components={{
            NoOptionsMessage: customNoOptionsMessage,
          }}
        />
      </div>
    </div>
  )
}

export default SetColorOne
