import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BenefitsSection from './BenefitsSection';

describe('BenefitsSection', () => {
    it('renderiza o título principal', () => {
        render(<BenefitsSection scrollY={0} />);
        expect(screen.getByText(/Por que Escolher/i)).toBeInTheDocument();
        expect(screen.getByText(/Nossas Lentes/i)).toBeInTheDocument();
    });
}); 