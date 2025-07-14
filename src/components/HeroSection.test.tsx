import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
    it('renderiza o título principal', () => {
        render(<HeroSection scrollY={0} />);
        expect(screen.getByText(/Seu óculos/i)).toBeInTheDocument();
        expect(screen.getByText(/como você nunca viu/i)).toBeInTheDocument();
    });
}); 