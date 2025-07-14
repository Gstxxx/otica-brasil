import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MultifocaisSection from './MultifocaisSection';

describe('MultifocaisSection', () => {
    it('renderiza o título principal', () => {
        render(<MultifocaisSection scrollY={0} />);
        expect(screen.getByText(/Lentes Multifocais/i)).toBeInTheDocument();
    });
}); 