<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="Styles/Styles.css" rel="stylesheet" />
    <script src="Scripts/json2.js"></script>
    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/RuleSetEditor.js"></script>
</head>
<body>

    <div class="section">
        <input id="addRule" type="button" value="Add Rule" />
        <input id="deleteRule" type="button" value="Delete Rule" />
        <label>
            &nbsp;&nbsp;&nbsp;Chaining:
            <select id="ruleChaining">
                <option value="None">Sequential</option>
                <option value="UpdateOnly">Explicit Update Only</option>
                <option value="Full">Full Chaining</option>
            </select>
        </label>
    </div>

    <div class="section">
        <table id="rulesTable" class="grid-view">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Priority</td>
                    <td>Reevaluation</td>
                    <td>Active</td>
                    <td>Rule Priview</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <div class="section">
        <table>
            <tbody>
                <tr>
                    <td>Name:</td>
                    <td>Priority:</td>
                    <td>Reevaluation:</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><input id="ruleName" type="text" /></td>
                    <td><input id="rulePriority" type="text" /></td>
                    <td>
                        <select id="ruleReevaluation">
                            <option value="Always">Always</option>
                            <option value="Never">Never</option>
                        </select>
                    </td>
                    <td><label><input id="ruleActive" type="checkbox" /> Active</label></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <div>Condition:</div>
        <div>
            <textarea id="ruleCondition" rows="3"></textarea>
        </div>
    </div>

    <div class="section">
        <div>Then Actions:</div>
        <div>
            <textarea id="ruleThenActions" rows="3"></textarea>
        </div>
    </div>

    <div class="section">
        <div>Else Actions:</div>
        <div>
            <textarea id="ruleElseActions" rows="3"></textarea>
        </div>
    </div>
    
    <div class="section">
        <input id="ruleSetSaveButton" type="button" value="Save" />
    </div>

</body>
</html>
