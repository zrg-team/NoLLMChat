import { HomePageProvider } from 'src/contexts/HomePage/Provider'
import HomeComponent from 'src/components/pages/Home'

export default function HomePage() {
  return (
    <HomePageProvider>
      <HomeComponent />
    </HomePageProvider>
  )
}
