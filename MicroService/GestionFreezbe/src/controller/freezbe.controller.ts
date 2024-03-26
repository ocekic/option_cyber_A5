// @ts-ignore
import Freezbe from '../models/freezbe.model';
import { Request, Response } from 'express';

exports.createFreezbe = async (req: Request, res: Response) => {
    const { nom, description, pUHT, gamme, ingredients, grammage } = req.body;
    const freezbe = new Freezbe({
        nom,
        description,
        pUHT,
        gamme,
        ingredients,
        grammage
    });
    try {
        const savedFreezbe = await freezbe.save();
        res.status(200).json(savedFreezbe);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteFreezbe = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Freezbe.deleteOne({ _id: id });
        res.status(200).json({ message: "Freezbe deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getFreezbeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const freezbe = await Freezbe.findById(id);
        if (!freezbe) {
            res.status(404).json({ message: "Freezbe not found" });
            return;
        }
        res.status(200).json(freezbe);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getAllFreezbes = async (req: Request, res: Response) => {
    try {
        const freezbes = await Freezbe.find();
        res.status(200).json(freezbes);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateFreezbe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom, description, pUHT, gamme, ingredients, grammage } = req.body;
    try {
        const updatedFreezbe = await Freezbe.findByIdAndUpdate(id, {
            nom,
            description,
            pUHT,
            gamme,
            ingredients,
            grammage
        }, { new: true });
        if (!updatedFreezbe) {
            res.status(404).json({ message: "Freezbe not found" });
            return;
        }
        res.status(200).json(updatedFreezbe);
    } catch (error) {
        res.status(500).send(error);
    }
}
