import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { StartButton } from '@/components/atoms/Buttons'
import { media } from '@/media/media'
import { fadeIn, pulse } from '@/styles/animations'

const heroContent = {
  badgeIcon: '✨',
  badgeText: 'Твой личный путь к продуктивности',
  title: 'Управляй временем',
  gradientTitle: 'с фокусом',
  subtitle:
    'Интуитивный интерфейс для тех, кто ценит каждую минуту. Создавай ритм продуктивности и достигай новых высот.',
  ctaTitle: 'Начать работу',
  ctaDesc: 'Присоединяйся к 10 000+ пользователей',
  stats: [
    { value: '100%', label: 'ФОКУС' },
    { value: '24/7', label: 'ДОСТУП' },
    { value: '365', label: 'ДНЕЙ' },
  ],
}

export const HomeHero = () => {
  const navigate = useNavigate()
  const handleStart = () => navigate('/timer')

  return (
    <HeroSection>
      <Badge>
        <SparkleIcon>{heroContent.badgeIcon}</SparkleIcon>
        {heroContent.badgeText}
      </Badge>
      <Title>
        {heroContent.title} <br />
        <GradientText>{heroContent.gradientTitle}</GradientText>
      </Title>
      <Subtitle>{heroContent.subtitle}</Subtitle>
      <CTAContainer>
        <StartButton onClick={handleStart} />
        <CTAContent>
          <CTATitle>{heroContent.ctaTitle}</CTATitle>
          <CTADesc>{heroContent.ctaDesc}</CTADesc>
        </CTAContent>
      </CTAContainer>

      <StatsGrid>
        {heroContent.stats.map((stat) => (
          <StatItem key={`${stat.value}-${stat.label}`}>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsGrid>
    </HeroSection>
  )
}

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.8s ease-out;

  ${media.isTablet} {
    align-items: center;
    order: 2;
  }
`

const Badge = styled.span`
  background: ${({ theme }) => theme.colors.linen};
  color: ${({ theme }) => theme.colors.navyblue};
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: clamp(10px, 2vh, 20px);
  border: 1px solid ${({ theme }) => theme.colors.parchment};
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.isTablet} {
    padding: 4px 12px;
    font-size: 11px;
    margin-bottom: 12px;
  }
`

const SparkleIcon = styled.span`
  animation: ${pulse} 2s infinite;
`

const Title = styled.h1`
  font-size: clamp(28px, 4.5vw, 64px);
  line-height: 1.05;
  margin: 0 0 clamp(12px, 2vh, 20px) 0;
  color: ${({ theme }) => theme.colors.navyblue};
  font-weight: 900;
  letter-spacing: -1px;

  ${media.isTablet} {
    margin-bottom: 8px;
  }
`

const GradientText = styled.span`
  background: ${({ theme }) => theme.colors.gradientpink};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p`
  font-size: clamp(14px, 1.5vw, 17px);
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.navyblue};
  opacity: 0.6;
  margin: 0 0 clamp(20px, 3vh, 32px) 0;
  max-width: 520px;

  ${media.isTablet} {
    margin: 0 auto 16px auto;
    font-size: 13px;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.parchment};
  padding-top: clamp(20px, 3.5vh, 40px);
  max-width: 450px;

  ${media.isTablet} {
    margin: 0 auto;
    width: 100%;
    padding-top: 15px;
    gap: 10px;
  }
`

const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: clamp(25px, 4vh, 48px);

  ${media.isTablet} {
    margin-bottom: 15px;
    gap: 12px;
  }

  ${media.isMobile} {
    flex-direction: column;
    gap: 10px;
  }
`

const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  ${media.isMobile} {
    text-align: center;
  }
`

const CTATitle = styled.span`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navyblue};

  ${media.isTablet} {
    font-size: 15px;
  }
`

const CTADesc = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.navyblue};
  opacity: 0.4;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const StatValue = styled.span`
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.raspberry};
`

const StatLabel = styled.span`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.navyblue};
  opacity: 0.5;
  font-weight: 700;
  letter-spacing: 0.5px;
`
