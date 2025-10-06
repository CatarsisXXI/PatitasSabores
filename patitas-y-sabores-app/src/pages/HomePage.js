import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Fade,
  Slide,
  Zoom,
  CardMedia
} from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductCarousel from '../components/ProductCarousel';
import FloatingPaws from '../components/FloatingPaws';

const HomePage = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Hero images for the carousel
  const heroImages = [
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=800&fit=crop'
  ];

  // Auto-change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Show content with animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <PetsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Productos Premium',
      description: 'Snacks de alta calidad especialmente formulados para mascotas'
    },
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: 'Compra Fácil',
      description: 'Proceso de compra simple y seguro desde la comodidad de tu hogar'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 48, color: 'error.main' }} />,
      title: 'Amor por las Mascotas',
      description: 'Cada producto está hecho pensando en el bienestar de tu compañero'
    }
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <FloatingPaws />
      {/* Hero Section with Image Carousel */}
      <Box
        sx={{

          position: 'relative',
          height: '80vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1
              }
            }}
          />
        ))}

        {/* Animated Product Preview Section */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: { xs: '150px', sm: '250px', md: '350px' },
            height: { xs: '150px', sm: '250px', md: '350px' },
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'float 6s ease-in-out infinite',
            zIndex: 3
          }}
        >
          <ProductCarousel />
        </Box>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}</style>

        {/* Hero Content */}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in={showContent} timeout={1000}>
            <Box textAlign="center">
              <Slide direction="down" in={showContent} timeout={800}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 700,
                    mb: 2,
                    color: '#FFFFFF',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 20px rgba(248, 246, 240, 0.3)',
                    animation: 'bounce 2s ease-in-out',
                    WebkitTextStroke: '1px rgba(212, 165, 116, 0.3)'
                  }}
                >
                  Patitas y Sabores
                </Typography>
              </Slide>

              <Slide direction="up" in={showContent} timeout={1000}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: '#F8F6F0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                    fontWeight: 400,
                    lineHeight: 1.4
                  }}
                >
                  Los mejores productos para los miembros más peludos de tu familia
                </Typography>
              </Slide>

              <Zoom in={showContent} timeout={1200}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/productos"
                  sx={{
                    px: 8,
                    py: 2.5,
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #D4A574 0%, #A8B5A0 50%, #8A7B5D 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 10px 30px rgba(212, 165, 116, 0.4)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    textTransform: 'none',
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.05)',
                      boxShadow: '0 20px 40px rgba(212, 165, 116, 0.5)',
                      background: 'linear-gradient(135deg, #B8955D 0%, #8A9683 50%, #6B5D4A 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.4)'
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(1.02)'
                    }
                  }}
                >
                  Explorar Productos
                </Button>
              </Zoom>
            </Box>
          </Fade>
        </Container>

        {/* Image Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 2
          }}
        >
          {heroImages.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentImageIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10, backgroundColor: '#FAF9F6' }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 8,
            fontWeight: 700,
            color: '#5D4E37',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              background: 'linear-gradient(90deg, #D4A574, #A8B5A0)',
              borderRadius: '2px'
            }
          }}
        >
          ¿Por qué elegir Patitas y Sabores?
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={showContent} timeout={800 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F0 100%)',
                    boxShadow: '0 12px 40px rgba(93, 78, 55, 0.1)',
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: index === 0 ? 'linear-gradient(90deg, #D4A574, #A8B5A0)' :
                                 index === 1 ? 'linear-gradient(90deg, #A8B5A0, #8A7B5D)' :
                                 'linear-gradient(90deg, #8A7B5D, #D4A574)',
                      borderRadius: '24px 24px 0 0'
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 25px 60px rgba(93, 78, 55, 0.15)',
                      border: '1px solid rgba(212, 165, 116, 0.4)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    <Box
                      sx={{
                        mb: 4,
                        p: 3,
                        borderRadius: '50%',
                        background: index === 0 ? 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(168, 181, 160, 0.1))' :
                                   index === 1 ? 'linear-gradient(135deg, rgba(168, 181, 160, 0.1), rgba(138, 123, 93, 0.1))' :
                                   'linear-gradient(135deg, rgba(138, 123, 93, 0.1), rgba(212, 165, 116, 0.1))',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: {
                          fontSize: 56,
                          color: index === 0 ? '#D4A574' :
                                 index === 1 ? '#A8B5A0' :
                                 '#8A7B5D'
                        }
                      })}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: '#5D4E37',
                        fontSize: '1.4rem'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#7D6B5D',
                        lineHeight: 1.6,
                        fontSize: '1rem',
                        fontWeight: 400
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Inspiration Section */}
      <Box sx={{ py: 10, backgroundColor: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              mb: 8,
              fontWeight: 700,
              color: '#5D4E37',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                background: 'linear-gradient(90deg, #D4A574, #A8B5A0)',
                borderRadius: '2px'
              }
            }}
          >
            Nuestra Inspiración
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {[
              {
                image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
                quote: 'El amor por todas las criaturas vivientes es el más noble atributo del hombre.'
              },
              {
                image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80',
                quote: 'Hasta que no hayas amado a un animal, una parte de tu alma permanecerá dormida.'
              },
              {
                image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80',
                quote: 'Los animales son amigos tan agradables: no hacen preguntas, no critican.'
              },
              {
                image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
                quote: 'La grandeza de una nación se puede juzgar por la forma en que trata a sus animales.'
              },
              {
                image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&q=80',
                quote: 'El tiempo pasado con los gatos nunca es tiempo perdido.'
              },
              {
                image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80',
                quote: 'Un perro es la única cosa en la tierra que te ama más de lo que se ama a sí mismo.'
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={showContent} timeout={1000 + index * 200}>
                  <Card sx={{
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover .quote-overlay': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    },
                    '&:hover .image-zoom': {
                      transform: 'scale(1.15)'
                    }
                  }}>
                    <CardMedia
                      className="image-zoom"
                      component="img"
                      height="400"
                      image={item.image}
                      alt={`Inspiration ${index + 1}`}
                      sx={{ transition: 'transform 0.5s ease' }}
                    />
                    <Box
                      className="quote-overlay"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: '#FFFFFF',
                        p: 3,
                        textAlign: 'center',
                        opacity: 0,
                        transform: 'translateY(100%)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease'
                      }}
                    >
                      <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 300, color: '#FFFFFF' }}>
                        "{item.quote}"
                      </Typography>
                    </Box>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxWidth="lg" sx={{ py: 8, backgroundColor: '#FAF9F6' }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            color: '#5D4E37',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Nuestros Números Hablan por Sí Solos
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            { number: '500+', label: 'Mascotas Felices', icon: <PetsIcon sx={{ fontSize: 40, color: '#D4A574' }} /> },
            { number: '1000+', label: 'Productos Vendidos', icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#A8B5A0' }} /> },
            { number: '50+', label: 'Productos Premium', icon: <StarIcon sx={{ fontSize: 40, color: '#8A7B5D' }} /> },
            { number: '98%', label: 'Clientes Satisfechos', icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#D4A574' }} /> }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Fade in={showContent} timeout={1000 + index * 200}>
                <Box textAlign="center">
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: '#5D4E37',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 1
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#7D6B5D',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Customer Testimonials Section */}
      <Box sx={{ py: 8, backgroundColor: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              color: '#5D4E37',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Lo Que Dicen Nuestros Clientes
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: 'María González',
                pet: 'Luna (Golden Retriever)',
                rating: 5,
                comment: '"Mis hijos aman estos snacks tanto como Luna. Son 100% naturales y Luna los devora con gusto. ¡Servicio excelente!"',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
              },
              {
                name: 'Carlos Rodríguez',
                pet: 'Milo (Gato Siamés)',
                rating: 5,
                comment: '"Milo es muy exigente con la comida, pero estos snacks premium son su favorito. Calidad excepcional y entrega rápida."',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
              },
              {
                name: 'Ana López',
                pet: 'Bella (Bulldog Francés)',
                rating: 5,
                comment: '"Bella tiene problemas digestivos y estos snacks naturales han sido una bendición. Mi veterinario los recomienda."',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={showContent} timeout={1200 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F0 100%)',
                      boxShadow: '0 8px 32px rgba(93, 78, 55, 0.1)',
                      border: '1px solid rgba(212, 165, 116, 0.2)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 45px rgba(93, 78, 55, 0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          color: '#5D4E37',
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          fontSize: '1rem'
                        }}
                      >
                        "{testimonial.comment}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            backgroundImage: `url(${testimonial.avatar})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            mr: 2
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: '#5D4E37',
                              fontSize: '1rem'
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#7D6B5D',
                              fontSize: '0.9rem'
                            }}
                          >
                            Dueño de {testimonial.pet}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trust Badges Section */}
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: '#FAF9F6' }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <SecurityIcon sx={{ fontSize: 48, color: '#D4A574' }} />,
              title: 'Pago Seguro',
              description: 'Transacciones protegidas con encriptación SSL'
            },
            {
              icon: <VerifiedIcon sx={{ fontSize: 48, color: '#A8B5A0' }} />,
              title: 'Productos Certificados',
              description: 'Ingredientes naturales y calidad garantizada'
            },
            {
              icon: <LocalShippingIcon sx={{ fontSize: 48, color: '#8A7B5D' }} />,
              title: 'Envío Rápido',
              description: 'Entrega en 24-48 horas en toda la ciudad'
            }
          ].map((badge, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={showContent} timeout={1400 + index * 200}>
                <Box textAlign="center">
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(168, 181, 160, 0.1))',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {badge.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: '#5D4E37'
                    }}
                  >
                    {badge.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#7D6B5D',
                      lineHeight: 1.5
                    }}
                  >
                    {badge.description}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #E8D5B7 0%, #F8F6F0 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: '#5D4E37'
            }}
          >
            Mantente Conectado
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: '#7D6B5D',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Suscríbete a nuestro newsletter y recibe consejos para el cuidado de tu mascota,
            ofertas exclusivas y novedades sobre nuestros productos.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              maxWidth: '500px',
              mx: 'auto',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '50px',
                px: 3,
                py: 1.5,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                flex: 1,
                minWidth: { xs: '250px', sm: 'auto' }
              }}
            >
              <EmailIcon sx={{ color: '#A8B5A0', mr: 1 }} />
              <Typography
                sx={{
                  color: '#7D6B5D',
                  flex: 1,
                  fontSize: '0.9rem'
                }}
              >
                Tu correo electrónico
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #D4A574 0%, #A8B5A0 50%, #8A7B5D 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(212, 165, 116, 0.4)',
                  background: 'linear-gradient(135deg, #B8955D 0%, #8A9683 50%, #6B5D4A 100%)'
                }
              }}
            >
              Suscribirse
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
          py: 10,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23D4A574" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: '#FFFFFF',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -15,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                background: 'linear-gradient(90deg, #D4A574, #A8B5A0, #8A7B5D)',
                borderRadius: '2px'
              }
            }}
          >
            ¡Descubre nuestros productos!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              color: '#ECF0F1',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Explora nuestra amplia variedad de snacks premium para perros y gatos,
            todos elaborados con ingredientes naturales y de la más alta calidad.
            ¡Encuentra el snack perfecto para tu compañero peludo!
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/productos"
            sx={{
              px: 8,
              py: 3,
              fontSize: '1.2rem',
              fontWeight: 600,
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #D4A574 0%, #A8B5A0 50%, #8A7B5D 100%)',
              color: '#FFFFFF',
              boxShadow: '0 12px 35px rgba(212, 165, 116, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textTransform: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s'
              },
              '&:hover': {
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: '0 20px 45px rgba(212, 165, 116, 0.5)',
                background: 'linear-gradient(135deg, #B8955D 0%, #8A9683 50%, #6B5D4A 100%)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                '&::before': {
                  left: '100%'
                }
              },
              '&:active': {
                transform: 'translateY(-2px) scale(1.02)'
              }
            }}
          >
            Ver Catálogo Completo
          </Button>
        </Container>
      </Box>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </Box>
  );
};

export default HomePage;
