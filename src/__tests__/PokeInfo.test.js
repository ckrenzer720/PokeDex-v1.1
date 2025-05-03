import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokeInfo from "../PokeInfo";
import {
  useAddPokemonMutation,
  useGetPokemonQuery,
} from "../../../state/pokedexApi";

jest.mock("../../../state/pokedexApi", () => ({
  useGetPokemonQuery: jest.fn(),
  useAddPokemonMutation: jest.fn(),
}));

describe("PokeInfo component", () => {
  const mockAddPokemon = jest.fn();

  beforeEach(() => {
    useGetPokemonQuery.mockReturnValue({
      data: {
        sprites: {
          front_default: "https://example.com/pokemon-image.png",
        },
      },
    });

    useAddPokemonMutation.mockReturnValue([mockAddPokemon]);
  });

  test("displays a name, an image, and an add button when loaded", () => {
    render(<PokeInfo name="squirtle" />);

    expect(
      screen.getByRole("heading", { name: /squirtle/i })
    ).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /pokemon/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://example.com/pokemon-image.png"
    );

    const button = screen.getByText(/gotta catch 'em all/i);
    expect(button).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /pokeball/i })).toHaveAttribute(
      "src",
      "images/pokeball.png"
    );
  });

  test("calls the addPokemon mutation when the button is clicked", () => {
    render(<PokeInfo name="pikachu" />);

    const button = screen.getByText(/gotta catch 'em all/i);
    userEvent.click(button);

    expect(mockAddPokemon).toHaveBeenCalledWith({
      name: "pikachu",
      img: "https://example.com/pokemon-image.png",
    });
  });
});