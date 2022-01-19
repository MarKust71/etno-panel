import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
  CSpinner,
} from '@coreui/react'
import { usePlaces } from '../../../hooks/usePlaces'
import { PlaceDetails } from './PlaceDetails'

const shortenText = (text) => {
  if (text.length <= 100) return text

  return `${text.substring(0, 96)}...`
}

export const Places = () => {
  const { getPlaces, isLoading } = usePlaces()

  const [places, setPlaces] = useState([])
  const [showPlaceDetails, setShowPlaceDetails] = useState(false)
  const [placeId, setPlaceId] = useState(0)

  const wasabiRegion = process.env.REACT_APP_WASABI_REGION
  const wasabiBucket = process.env.REACT_APP_WASABI_BUCKET

  const fetchPlaces = async () => {
    const data = await getPlaces()
    if (data !== null)
      setPlaces(
        data.map((place) => ({
          id: place.id,
          name: place.name ? place.name : '(brak tytułu)',
          description: place.description ? shortenText(place.description) : '(brak opisu)',
          image: place.mainImage?.fileName,
        })),
      )
  }

  const handleButtonClick = (id) => {
    setPlaceId(id)
    setShowPlaceDetails((prevState) => !prevState)
  }

  const handlePlaceDetailsClose = () => {
    setShowPlaceDetails(false)
  }

  useEffect(() => {
    fetchPlaces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CContainer>
        <CRow className="mb-4">
          <CCol>
            <CCardHeader className="d-flex flex-row align-items-center">
              <h4>Miejsca</h4>
              {isLoading && <CSpinner color="primary" size="sm" className="ms-3" />}
            </CCardHeader>
          </CCol>
        </CRow>

        {showPlaceDetails && !isLoading && (
          <PlaceDetails
            id={placeId}
            visible={showPlaceDetails && !isLoading}
            onClose={handlePlaceDetailsClose}
          />
        )}

        <CRow className="mb-4 h-100" xs={{ cols: 'auto', gutter: 3 }}>
          {places.map((place) => (
            <React.Fragment key={`place-${place.id}`}>
              <CCol sm="auto">
                <CCard className="h-100">
                  {place.image ? (
                    <CCardImage
                      src={`https://${wasabiRegion}/${wasabiBucket}/${place.image}`}
                      height="140"
                    />
                  ) : (
                    <CCardImage
                      component="svg"
                      orientation="top"
                      height="140"
                      width="15em"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" fill="#868e96"></rect>
                    </CCardImage>
                  )}
                  <CCardBody style={{ maxWidth: '15em' }}>
                    <CCardTitle>{place.name}</CCardTitle>
                    <CCardText>{place.description}</CCardText>
                  </CCardBody>
                  <CCardFooter className="d-flex justify-content-end">
                    <CButton onClick={() => handleButtonClick(place.id)} disabled={isLoading}>
                      {isLoading ? <CSpinner color="primary" size="sm" /> : 'Szczegóły'}
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </React.Fragment>
          ))}
        </CRow>
      </CContainer>
    </>
  )
}
