import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { getDifferenceBlendColor, hasNumber } from '../utils/colorUtils'

const SetColorTwo: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [options, setOptions] = useState<{ label: string; value: any }[]>([])
  const selectRef = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [routeColorTwo, setRouteColorTwo] = useState<
    { name: string; rgb: string }[]
  >([])

  const hasNumberResult = hasNumber(backgroundColor)
  const navigate = useNavigate()
  const location = useLocation()
  const routeColorOneRef = useRef<{ name: string; rgb: string }[]>(
    location.state && location.state.routeColorOne
      ? location.state.routeColorOne
      : []
  )
  const routeColorOne = routeColorOneRef.current

  //Fetch color
  const fetchColors = async (searchQuery: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3001/colors?q=${searchQuery}`
      )
      const data = await response.json()

      // Update options based on filter results
      const newOptions = data.items.map((color) => ({
        label: color.name,
        value: color,
      }))
      setOptions(newOptions)
    } catch (error) {
      console.error('Error fetching colors:', error.message)
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
    setRouteColorTwo(selectedOption?.value)

    // Update the URL with the selected color
    const newUrl = selectedOption
      ? `/second?color=${encodeURIComponent(selectedOption.label)}`
      : '/second'
    navigate(newUrl, { replace: true }) // Use replace to update the URL without creating a new entry in the history

    const resultingColor = getDifferenceBlendColor(
      { name: selectedOption?.value?.name, rgb: selectedOption?.value?.rgb },
      { name: routeColorOne.name, rgb: routeColorOne.rgb }
    )
    console.log(resultingColor)
    setBackgroundColor(resultingColor || '') // Set background color
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
      Array.isArray(routeColorTwo) &&
      !routeColorTwo.some((color) => color.name === colorParam)
    ) {
      // Fetch colors based on the color parameter
      fetchColors(colorParam)
      setBackgroundColor(colorParam) // Set background color
    }
  }, [location.search, routeColorTwo])

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
          <li>
            <Link to="/first" state={{ routeColorTwo }}>
              Set color #1
            </Link>
          </li>
          <li className="active">
            <Link to="/" onClick={(event) => event.preventDefault()}>
              Set color #2
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
          Select second color
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

export default SetColorTwo
