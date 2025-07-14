import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('renderiza o logo e navegação', () => {
        render(<Header isMenuOpen={false} setIsMenuOpen={() => { }} />);
        expect(screen.getByAltText(/Ótica do Brasil/i)).toBeInTheDocument();
        expect(screen.getByText(/Início/i)).toBeInTheDocument();
        expect(screen.getByText(/Multifocais/i)).toBeInTheDocument();
        expect(screen.getByText(/Benefícios/i)).toBeInTheDocument();
        expect(screen.getByText(/Contato/i)).toBeInTheDocument();
    });

    it('abre o menu mobile ao clicar', () => {
        const setIsMenuOpen = jest.fn();
        render(<Header isMenuOpen={false} setIsMenuOpen={setIsMenuOpen} />);
        fireEvent.click(screen.getByRole('button'));
        expect(setIsMenuOpen).toHaveBeenCalledWith(true);
    });
}); 