//
//  ViewController.swift
//  Lab04
//
//  Created by Алексей Морозов on 19.11.2019.
//  Copyright © 2019 Алексей Морозов. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {
    @IBOutlet weak var T1Field: NSTextField!
    @IBOutlet weak var dT1Field: NSTextField!
    
    @IBOutlet weak var Top1Field: NSTextField!
    @IBOutlet weak var dTop1Field: NSTextField!
    
    @IBOutlet weak var Top2Field: NSTextField!
    @IBOutlet weak var dTop2Field: NSTextField!
    
    @IBOutlet weak var Top3Field: NSTextField!
    @IBOutlet weak var dTop3Field: NSTextField!
    
    @IBOutlet weak var Tcomp1Field: NSTextField!
    @IBOutlet weak var Tcomp2Field: NSTextField!
    
    @IBOutlet weak var countField: NSTextField!
    
    @IBOutlet weak var resultField: NSTextField!
    
    
    let bash: CommandExecuting = Bash()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        modellingMethodBox.selectItem(at: 1)
        setupResultLabels()
    }
    
    func setupResultLabels() {
        [amountOfReqResultLabel, reReqRestultLabel, maxQueueLenResultLabel, timeResultLabel].forEach({
            $0?.stringValue = ""
        })
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    @IBAction func methodTapped(_ sender: NSComboBox) {
        if (sender.indexOfSelectedItem == 0) {
            deltaTField.isEditable = false
            deltaTField.alphaValue = 0.4
            deltaTLabel.alphaValue = 0.4
        } else {
            deltaTField.isEditable = true
            deltaTField.alphaValue = 1
            deltaTLabel.alphaValue = 1
        }
    }
    
    func setResults(result: String) {
        var resString = result
        resString = String(resString.dropFirst())
        resString = String(resString.dropLast().dropLast())
        print("Get string: \(resString)")
        let results = resString.split(separator: ",")
        print("Get array: \(results)")
        if results.count > 0 {
            amountOfReqResultLabel.stringValue = String(results[0])
            reReqRestultLabel.stringValue = String(results[1])
            maxQueueLenResultLabel.stringValue = String(results[2])
            timeResultLabel.stringValue = String(results[3])
        }
        
    }
    
    func runModel() {
        // MARK: - Параметры
        let a = String(aParamField.doubleValue)
        let b = String(bParamField.doubleValue)
        
        let lambda = String(lambdaParamField.doubleValue)
        
        let amountOfReq = String(amountOfReqField.doubleValue)
        let probRep = String(probRepReqField.doubleValue)
        let method = String(modellingMethodBox.indexOfSelectedItem)
        //        print(method)
        
        let delta = String(deltaTField.doubleValue)
        
//         MARK: - Вызов скрипта
        let path = "/Users/mkhitaryanviktoriya/Desktop/Моделирование/lab5/Lab04/main.py"
        if Int(method) == 0 {
            if let res = self.bash.execute(commandName: "python3", arguments: [path, a, b, lambda, amountOfReq, probRep, method]) {
                print("From Python: \(res)")
                self.setResults(result: res)
            }
        } else {
            if let res = self.bash.execute(commandName: "python3", arguments: [path, a, b, lambda, amountOfReq, probRep, method, delta]) {
                print("From Python: \(res)")
                self.setResults(result: res)
            }
        }
    }

    @IBAction func runModelling(_ sender: NSButtonCell) {
        runModel()
    }
    
}

