import { fireEvent, screen, render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test } from 'vitest';
import ChatWrapper from '../components/ChatWrapper';

describe("Button test", () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    beforeEach(() => {
        render(<ChatWrapper />);
    });

    // Not show message until button clicked
    // Should only have 'header-light' class when open
    test("Not show welcome message", async () => {
        expect(screen.getByText(/Need Help?/i)).not.toHaveClass('header-light');
    });

    // Open on click
    test("Toggle between open/ closed on click", async () => {
        const button = screen.getByText(/Need Help?/i);
        
        // open 
        fireEvent.click(button);
        expect(screen.getByText(/Need Help?/i)).toHaveClass('header-light');

        // close
        fireEvent.click(button);
        expect(screen.getByText(/Need Help?/i)).not.toHaveClass('header-light');
    });
})